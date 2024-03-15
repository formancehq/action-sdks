import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const organization = core.getInput('organization')
    const repository = core.getInput('repository')

    // Get octokit
    const octokit = getOctokit(core.getInput('token'))

    const releases = await octokit.rest.repos.listReleases({
      owner: organization,
      repo: repository
    })

    const lastStackRelease = releases.data[0]
    core.info(`Last release: ${lastStackRelease.tag_name}`)

    // Retrieve the `openapi.json` file from the last release
    const releaseAssets = await octokit.rest.repos.listReleaseAssets({
      owner: organization,
      repo: repository,
      release_id: lastStackRelease.id
    })

    const openapiAsset = releaseAssets.data.find(
      asset => asset.name === 'openapi.json'
    )
    if (!openapiAsset) {
      throw new Error('No `openapi.json` file found in the last release')
    }

    // Output the download URL
    core.setOutput('openapi_spec_url', openapiAsset.browser_download_url)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
