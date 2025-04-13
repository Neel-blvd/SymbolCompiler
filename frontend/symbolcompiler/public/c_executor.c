#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to execute C code
char* execute_c_code(const char* code) {
    // Create a temporary file
    FILE* temp_file = fopen("temp.c", "w");
    if (!temp_file) {
        return "Error creating temporary file";
    }
    
    // Write the code to the file
    fprintf(temp_file, "%s", code);
    fclose(temp_file);
    
    // Compile the code
    system("gcc temp.c -o temp.exe");
    
    // Execute the compiled program
    FILE* pipe = popen("./temp.exe", "r");
    if (!pipe) {
        return "Error executing program";
    }
    
    // Read the output
    char buffer[1024];
    char* result = (char*)malloc(1024);
    result[0] = '\0';
    
    while (fgets(buffer, sizeof(buffer), pipe) != NULL) {
        strcat(result, buffer);
    }
    
    pclose(pipe);
    remove("temp.c");
    remove("temp.exe");
    
    return result;
} 