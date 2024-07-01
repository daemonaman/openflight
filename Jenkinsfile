pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        MONGODB_URL = 'mongodb+srv://rahulkajla2000:CZuAQ8XVmmY5RwnZ@cluster0.zbiqovp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        JWT_ACCESS_SECRET = '551e695bcabf4e376e66e7031b856c2524892d799dd5148021531cd7034458e1'
        JWT_REFRESH_SECRET = '2fbcdc1aee4c42f9c4e61cf07c30f3b011cb434af6ba5b8d1e768061ca7998d7'
        SMTP_HOST = 'smtp.gmail.com'
        SMTP_PORT = '587'
        SMTP_USER = 'rahulkajla2000@gmail.com'
        SMTP_PASSWORD = '7737044693'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Rahuljat17/onlyproperty-login-backend.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to the server...'
                // Add your deployment steps here
            }
        }
    }
}
