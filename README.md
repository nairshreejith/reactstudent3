React Project Setup:

Install Visual Studio Code: If you haven't already, download and install Visual Studio Code.
Install Dependencies: Open your project directory in the terminal and execute npm install to fetch all the required packages.
Start the Project: Run npm run start in the terminal to launch the development server.
React Project Features:

Add a User: Easily add a new user with all the necessary details.
Search for a User: Quickly find users by searching with their names or email addresses.
Edit User Information: Update the first name of an existing user effortlessly.
Delete a User: Remove a user from the system with ease.
Java Project (Spring Boot) Setup:

Install Prerequisites: Make sure you have Java installed on your system.
Download Spring Boot STS IDE: Download and install the Spring Tool Suite (STS) IDE.
Maven Update: In STS, right-click on your project and choose "Maven" -> "Update Project."
Maven Clean and Install: Right-click on the project, select "Run As" -> "Maven clean," and then "Run As" -> "Maven install."
Run the Application: Launch your Spring Boot application.
Java Project (Spring Boot) Features:

Same features as the React project, including adding, searching, editing, and deleting users.
AWS Interaction:

Log In: Access your AWS account using your login credentials.
Navigate to Services: Head to the AWS Services dashboard.
Locate SQS: In the search bar, type "Simple Queue Service" or "SQS" and select it.
Open Pre-configured Queue: Click on the pre-configured queue.
Send and Receive Messages: Utilize the "Send and Receive Messages" button.
Send a Message: Input your message in the field and click "Send."
Check Application Console: The Java application will consume the message from the AWS SQS queue, and you'll observe the message logged in the application console, thanks to the continuous monitoring by the JMS listener.
Running Test Cases:

Execute JUnit Tests: Right-click on your project in your IDE and select "Run JUnit tests." Ensure that all tests pass successfully, as the JUnit tests are already written and configured.
