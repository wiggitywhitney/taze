import { trace, SpanStatusCode } from '@opentelemetry/api'
import type { BunWorkspaceMeta, CommonOptions, RawDep } from '../types'
import { readFile, writeFile } from 'node:fs/promises'
import detectIndent from 'detect-indent'
import { resolve } from 'pathe'
import { dumpDependencies, parseDependency } from './dependencies'

const tracer = trace.getTracer('taze')

export async function loadBunWorkspace(
  relative: string,
  options: CommonOptions,
  shouldUpdate: (name: string) => boolean,
  existingRaw?: Record<string, any>,
): Promise<BunWorkspaceMeta[]> {
  return tracer.startActiveSpan('taze.bun.load_workspace', async (span) => {
    try {
      const filepath = resolve(options.cwd ?? '', relative)
      const raw: Record<string, any> = existingRaw ?? JSON.parse(await readFile(filepath, 'utf-8'))

      const catalogs: BunWorkspaceMeta[] = []

      function createBunWorkspaceEntry(name: string, map: Record<string, string>): BunWorkspaceMeta {
        const deps: RawDep[] = Object.entries(map)
          .map(([pkg, version]) => parseDependency({ name: pkg, version, type: 'bun-workspace', shouldUpdate }))

        return {
          name,
          private: true,
          version: '',
          type: 'bun-workspace',
          relative,
          filepath,
          raw,
          deps,
          resolved: [],
        } satisfies BunWorkspaceMeta
      }

      // Handle Bun workspaces structure
      const workspaces = raw?.workspaces

      if (workspaces) {
        // Check if workspaces has catalog (singular)
        if (workspaces.catalog) {
          catalogs.push(
            createBunWorkspaceEntry('bun-catalog:default', workspaces.catalog),
          )
        }

        // Check if workspaces has catalogs (plural)
        if (workspaces.catalogs) {
          for (const key of Object.keys(workspaces.catalogs)) {
            catalogs.push(
              createBunWorkspaceEntry(`bun-catalog:${key}`, workspaces.catalogs[key]),
            )
          }
        }
      }

      span.setAttribute('taze.write.file_path', relative)
      span.setAttribute('taze.check.packages_total', catalogs.reduce((sum, c) => sum + c.deps.length, 0))
      return catalogs
    } catch (error) {
      span.recordException(error instanceof Error ? error : new Error(String(error)))
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    } finally {
      span.end()
    }
  })
}

export async function writeBunWorkspace(
  pkg: BunWorkspaceMeta,
  _options: CommonOptions,
) {
  return tracer.startActiveSpan('taze.bun.write_workspace', async (span) => {
    try {
      const versions = dumpDependencies(pkg.resolved, 'bun-workspace')

      span.setAttribute('taze.write.file_path', pkg.filepath)
      span.setAttribute('taze.write.package_type', 'bun-workspace')

      if (!Object.keys(versions).length)
        return

      span.setAttribute('taze.write.changes_count', Object.keys(versions).length)

      if (pkg.name.startsWith('bun-catalog:')) {
        const catalogName = pkg.name.replace('bun-catalog:', '')

        // Ensure workspaces object exists and cast to proper type
        const workspaces = (pkg.raw.workspaces as Record<string, unknown>) || {}
        pkg.raw.workspaces = workspaces

        if (catalogName === 'default') {
          // Update the default catalog
          const catalog = (workspaces.catalog as Record<string, string>) || {}
          workspaces.catalog = { ...catalog, ...versions }
        }
        else {
          // Update named catalog
          const catalogs = (workspaces.catalogs as Record<string, Record<string, string>>) || {}
          workspaces.catalogs = catalogs
          if (!catalogs[catalogName]) {
            catalogs[catalogName] = {}
          }
          catalogs[catalogName] = { ...catalogs[catalogName], ...versions }
        }

        await writeBunJSON(pkg.filepath, pkg.raw)
      }
    } catch (error) {
      span.recordException(error instanceof Error ? error : new Error(String(error)))
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    } finally {
      span.end()
    }
  })
}

async function writeBunJSON(filepath: string, data: Record<string, unknown>) {
  let fileIndent: string | undefined
  try {
    const actualContent = await readFile(filepath, 'utf-8')
    fileIndent = detectIndent(actualContent).indent
  }
  catch {}
  const content = JSON.stringify(data, null, fileIndent || '  ')
  return writeFile(filepath, `${content}\n`, 'utf-8')
}
