# flow-coverage-action

A github action to lint for flow coverage! This allows you to have much more confidence while using a type system that has escape hatches :)

## Using the action

```
	steps:
    - name: flow coverage
      uses: Khan/flow-coverage-action@main
      with:
        flow-bin: ./node_modules/.bin/flow
        check-run-subtitle: 'React Native Folder'
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Using the cli

You can download the cli directly from `dist/bin/index.js`, or clone the repo.

`./path/to/flow-coverage-action/dist/bin/index.js my-file.js`

And it will show you what coverage error that file has!

You can use [fd](https://github.com/sharkdp/fd) to get all of your javascript files (and respects `.gitignore` by default!)

```bash
$ fd '.js$' some-directory | xargs ./path/to/flow-coverage-action/dist/bin/index.js
```