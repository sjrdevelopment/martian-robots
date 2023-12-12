# Martian Robots

A Node-based command line interface for calculating martian robot end positions based on a series of movement instructions

## Prerequisites

It is assumed you have Node v16+ and npm installed

## Setup

Run `npm install` followed by `npm start` to run the application in the command line

## Usage

For demonstration purposes the application uses command line prompts to get each line of input, starting with the grid maximum coordinate, followed by a starting position and command.

When prompted enter each command followed by enter, and the application will return the end position via stdout.

## Testing

Run `npm test` to view the output of the Jest test suite.

## Further enhancements / TODOs

For development and demonstration purposes, the application uses the command line to prompt for each line of input, but the functionality is abstracted enough to swap this for reading from a file or stream of data, which may be more suitable for multiple robot commands.

Additional tests to cover the edge cases will be required, as well as extra validation as it is expected there are known edge cases for invalid input that are not checked against. Given more time it would be good to cover these with accompanying tests.
