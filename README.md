# formancehq/action-sdks

This repo contains a github action taht fect the download url of the latest
released Formance OpenAPI specification.

## Usage

```yaml
- name: Fetch Formance OpenAPI specification
  id: fetch
  uses: formancehq/action-sdks@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}

- name: Use the OpenAPI specification
  run: |
    echo "The OpenAPI specification is at ${{ steps.fetch.outputs.openapi_spec_url }}"
```

## Inputs

### `token`

**Required** The GitHub token to use to fetch the OpenAPI specification.

### `organization`

The GitHub organization to fetch the OpenAPI specification from. Defaults to
`formancehq`.

### `repository`

The GitHub repository to fetch the OpenAPI specification from. Defaults to
`stack`.

## Outputs

### `openapi_spec_url`

The URL of the OpenAPI specification.
