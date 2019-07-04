#!/bin/bash

FILES=./examples/*
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  n=$(basename $f)
  ./lox2python.js $f | python &> $n.out.py
  ./cli.js $f &> $n.out.lox
  diff $n.out.lox $n.out.py
done
rm *.out.py
rm *.out.lox
