# [Advent of Code](https://adventofcode.com/) 🎄

This repo is used to help maintain my [JavaScript solutions](https://github.com/amorriscode/advent-of-code-solutions) for Advent of Code.

## Setup

1. [Generate a repo from this template](https://github.com/amorriscode/advent-of-code/generate)

2. Install dependencies

    ```bash
    yarn
    ```

3. Bask in the holiday cheer 🎅

## Generate a new solution from a template

```bash
YEAR=20XX DAY=0X yarn new
```

## Copy your inputs

Inside the `/inputs` directory, you'll see have an `input.txt` and `example.txt` for each day you are solving. The `input.txt` is your unique Advent of Code input. The `example.txt` is for the example input given in the text of the question.

### Automatically downloading your input

If you want to have your input automatically downloaded from the Advent of Code API, simply add a `.env` file at the root of your project with your Advent of Code session ID. This is the cookie that is set on your browser when you log in to the website.

## Run tests while you're solve the problem

```bash
YEAR=20XX DAY=0X yarn test --watch
```

## Display the output for a solution

```bash
YEAR=20XX DAY=0X yarn solve
```

![Sample output](https://user-images.githubusercontent.com/16005567/100702881-566baa80-3357-11eb-9500-dfab877c824f.png)
