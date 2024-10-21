import os
from jsmin import jsmin

src_directory = 'src'
output_file = 'GE.js'
excluded_files = []
glitch_engine_file = 'GlitchEngine.js'
load_order = [
    '../runtimeInject.js',
    "utils.js",
    'keyBehaviour/keyBehaviour.js',
    'objectWindows/CanvasWindow.js',
    'objectWindows/GraphicWindow.js',
    'objectWindows/TextWindow.js',
    'launchHook.js',
]

def read_and_merge_files(src_directory, excluded_files, output_file, glitch_engine_file, load_order):
    merged_content = []

    for file in load_order:
        if file in excluded_files:
            continue
        file_path = os.path.join(src_directory, file)
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                lines = f.readlines()
                filtered_lines = [line for line in lines if not (line.strip().startswith('import') or line.strip().startswith('export'))]
                merged_content.extend(filtered_lines)

    # Add the last line of GlitchEngine.js to the merged content
    if os.path.exists(glitch_engine_file):
        with open(glitch_engine_file, 'r') as f:
            lines = f.readlines()
            if lines:
                last_line = lines[-1]
                merged_content.append(last_line)

    # Ensure the output file is created if it doesn't exist
    if not os.path.exists(output_file):
        open(output_file, 'w').close()

    with open(output_file, 'w') as f:
        f.writelines(merged_content)

    # Perform jsmin operation and save to new file
    minified_output_file = output_file.replace('.js', '.min.js')
    with open(output_file, 'r') as f:
        minified_content = jsmin(f.read())
    with open(minified_output_file, 'w') as f:
        f.write(minified_content)

if __name__ == "__main__":
    read_and_merge_files(src_directory, excluded_files, output_file, glitch_engine_file, load_order)
