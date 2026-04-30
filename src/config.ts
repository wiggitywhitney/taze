import { trace, SpanStatusCode } from '@opentelemetry/api'
import type { CommonOptions } from './types'
import process from 'node:process'
import { toArray } from '@antfu/utils'
import _debug from 'debug'
import deepmerge from 'deepmerge'
import { createConfigLoader } from 'unconfig'
import { DEFAULT_CHECK_OPTIONS } from './constants'

const debug = _debug('taze:config')
const tracer = trace.getTracer('taze')

function normalizeConfig(options: CommonOptions) {
  // interop
  if ('default' in options)
    options = options.default as CommonOptions

  options.ignorePaths = toArray(options.ignorePaths)
  options.exclude = toArray(options.exclude)
  options.include = toArray(options.include)

  if (options.silent)
    options.loglevel = 'silent'

  return options
}

export async function resolveConfig(
  options: CommonOptions,
): Promise<CommonOptions> {
  return tracer.startActiveSpan('taze.config.resolve', async (span) => {
    try {
      const defaults = DEFAULT_CHECK_OPTIONS
      options = normalizeConfig(options)

      const loader = createConfigLoader<CommonOptions>({
        sources: [
          {
            files: [
              'taze.config',
            ],
          },
          {
            files: [
              '.tazerc',
            ],
            extensions: ['json', ''],
          },
        ],
        cwd: options.cwd || process.cwd(),
        merge: false,
      })

      const config = await loader.load()

      span.setAttribute('taze.config.found', config.sources.length > 0)

      if (!config.sources.length)
        return deepmerge(defaults, options)

      debug(`config file found ${config.sources[0]}`)
      const configOptions = normalizeConfig(config.config)

      return deepmerge(deepmerge(defaults, configOptions), options)
    }
    catch (error) {
      span.recordException(error instanceof Error ? error : new Error(String(error)))
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    }
    finally {
      span.end()
    }
  })
}
