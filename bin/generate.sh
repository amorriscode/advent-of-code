#!/bin/sh
set -e

DIR=$(dirname $0)
ENV_PATH=$DIR/../.env

# Look for a .env file
if [[ -f "$ENV_PATH" ]]
then
  echo "Loading .env file from $ENV_PATH"
  source $ENV_PATH
fi

# Make solution directory
mkdir -p ./solutions/$YEAR/$DAY

# Make input files
mkdir -p ./inputs/$YEAR/$DAY
touch ./inputs/$YEAR/$DAY/example.txt

# Download puzzle input from Advent of Code API
if [[ -n $ADVENT_OF_CODE_SESSION ]]
then
  echo "Attempting to download input from API..."
  DAY_WITHOUT_ZERO=$(echo $DAY | sed 's/^0*//')
  curl -b session=$ADVENT_OF_CODE_SESSION https://adventofcode.com/${YEAR}/day/${DAY_WITHOUT_ZERO}/input > ./inputs/$YEAR/$DAY/input.txt || echo "Failed to download input from Advent of Code!"
fi

# If the input download failed for some reason, write an empty file
if [[ ! -e  ./inputs/$YEAR/$DAY/input.txt ]]
then
  echo "Writing empty input file..."
  touch ./inputs/$YEAR/$DAY/input.txt
fi

# Copy the template files over
cp -r ./_template/ ./solutions/$YEAR/$DAY/

# Replace the year template variable
sed -i '' "s/{{YEAR}}/$YEAR/g" ./solutions/$YEAR/$DAY/README.md
sed -i '' "s/{{YEAR}}/$YEAR/g" ./solutions/$YEAR/$DAY/input.js

# Replace the day template variable
sed -i '' "s/{{DAY}}/$DAY/g" ./solutions/$YEAR/$DAY/README.md
sed -i '' "s/{{DAY}}/$DAY/g" ./solutions/$YEAR/$DAY/input.js

echo "Generated code for Advent of Code $YEAR Day $DAY 🎄"
