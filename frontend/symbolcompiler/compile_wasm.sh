#!/bin/bash

# Install Emscripten SDK if not already installed
if [ ! -d "emsdk" ]; then
    git clone https://github.com/emscripten-core/emsdk.git
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    source ./emsdk_env.sh
    cd ..
fi

# Compile C code to WebAssembly
emcc public/c_executor.c \
    -o public/c_executor.js \
    -s WASM=1 \
    -s EXPORTED_FUNCTIONS='["_execute_c_code", "_malloc", "_free"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
    -s ALLOW_MEMORY_GROWTH=1 