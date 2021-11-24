#!/bin/bash
sphinx-apidoc -o source/ ../api/.
make html
