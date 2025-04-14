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

# Compile C code to WebAssembly with debugging enabled
emcc public/c_executor.c \
    -o public/c_executor.js \
    -s WASM=1 \
    -s EXPORTED_FUNCTIONS='["_execute_c_code", "_malloc", "_free"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "allocateUTF8", "UTF8ToString"]' \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s INITIAL_MEMORY=16MB \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='createModule' \
    -s ENVIRONMENT='web' \
    -s ASSERTIONS=2 \
    -g4 \
    -O0 