from flask import Flask, request, jsonify, render_template
from dbConnect import connect_to_database, insert_data, find_user_by_credentials
from flask_cors import CORS
import os
import subprocess
from flask_mysqldb import MySQL

template_dir = os.path.join(os.getcwd(), "templates")
STATIC_FOLDER = 'static/assets'
app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder=template_dir)
cors = CORS(app)
app.config.from_object('config')

mysql = MySQL(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Example: Limit to 16 MB


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login.html')
def login():
    return render_template("login.html")

@app.route('/profile.html')
def profil():
    return render_template("profile.html")
# ----
# Add new user (register)
@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        post_data = request.get_json()
        # Insert the new user
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (first_name, last_name, company_name, email, username, password) VALUES (%s, %s, %s, %s, %s, %s)",
                (post_data['firstname'], post_data['lastname'], post_data['companyName'], post_data['email'], post_data['username'], post_data['password']))
        mysql.connection.commit()
        cur.close()


        return jsonify({"message": "User added successfully"})
    except Exception as e:
        # Handle the exception (e.g., log the error, return an error message)
        return jsonify({"error": str(e)}), 500


# Authentification (login)
@app.route('/authenticate_user', methods=['POST'])
def authenticate_user():
    try:
        post_data = request.get_json()
        
        username = post_data['username']  # Get the 'user' field from the request JSON
        password = post_data.get('password')  # Get the 'password' field from the request JSON

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username,password))
        user = cur.fetchone()
        cur.close()
        if user:
            return jsonify({"authenticated": True, "message": "User authenticated successfully", "data": user})
        else:
            return jsonify({"authenticated": False, "message": "Invalid username or password"}), 405
    except Exception as e:
        # Handle the exception (e.g., log the error, return an error message)
        return jsonify({"error": str(e)}), 500


# route upload cv
@app.route('/upload_cv', methods=['POST'])
def upload_file_cv():
    try:
        uploaded_files = request.files.getlist('attachment_cv')
        print(uploaded_files)
        
        for file in uploaded_files:
            # Save the file to a location on your server
            file.save('uploads/cv/' + file.filename) 

        return 'Files uploaded successfully'
    except Exception as e:
        print(e)
        return str(e), 500
    


# route upload job
@app.route('/upload_job', methods=['POST'])
def upload_file_job():
    try:
        uploaded_files = request.files.getlist('attachment_job')
        print(uploaded_files)
        
        for file in uploaded_files:
            # Save the file to a location on your server
            file.save('uploads/jobs/' + file.filename) 


        return 'Files uploaded successfully'
    except Exception as e:
        return str(e), 500



#  route for running the script of compare cv and job
@app.route('/run_script', methods=['POST'])
def run_script():
    # Retrieve the percentage from the request
    #percentage = request.args.get('percentage')
    #print(percentage)



    #script_path = 'scripts/vector_similarity.py'  # Replace with the actual path to your script
    script_path = r"C:\Users\guedrouz.ESH\Downloads\web_dev\dev_samrtCV\back\scripts\vector_similarity.py"  # Replace with the actual path to your script
    
    # Check if the script file exists
    if os.path.isfile(script_path):
        # Run the script with the provided percentage
        try:
            result = subprocess.run(["python", script_path], capture_output=True, text=True)
            # Extract stdout and stderr
            stdout = result.stdout
            stderr = result.stderr
            print(result)
            # Return the relevant information
            print(jsonify(data=stdout))
            return jsonify(data=stdout)
        except subprocess.CalledProcessError as e:
            return jsonify(error=f'Error executing script: {e}')
    else:
        return jsonify(error=f'Script file not found at {script_path}')
    

@app.route('/getskills', methods=['POST'])
def getskills():
        # Retrieve the percentage from the request
        #percentage = request.args.get('percentage')
        #print(percentage)



        #script_path = 'scripts/vector_similarity.py'  # Replace with the actual path to your script
    script_path = r"C:\Users\guedrouz.ESH\Downloads\web_dev\dev_samrtCV\back\scripts\test.py"  # Replace with the actual path to your script
        
        # Check if the script file exists
    if os.path.isfile(script_path):
            # Run the script with the provided percentage
        try:
            result = subprocess.run(["python", script_path], capture_output=True, text=True)
                # Extract stdout and stderr
            stdout = result.stdout
            stderr = result.stderr
            print(result)
                # Return the relevant information
            print(jsonify(stdout))
            return jsonify(data=stdout)
        except subprocess.CalledProcessError as e:
            return jsonify(error=f'Error executing script: {e}')
    else:
        return jsonify(error=f'Script file not found at {script_path}')
    # Run your script with the provided percentage
    # (Note: You may need to modify this depending on how your script is structured)
    # result = run_your_script_with_percentage(percentage)
    


if __name__ == '__main__':
    app.run(port=8000, debug=True)
