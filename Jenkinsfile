pipeline{
	agent any
	stages {
		stage ("pull code from git repo"){
			steps{
				git branch: 'main', url: 'https://github.com/Rahuljat17/onlyproperty-login-backend.git'
			}
		}

		stage('Build'){
			steps{
				sh 'npm install'
                                sh 'npm run build'
			     }
			    }

		stage ("Building docker image"){
			steps{
				sh 'sudo docker build -t onlyproperty:$BUILD_TAG .'
				sh 'sudo docker tag onlyproperty:$BUILD_TAG rahul9664/onlyproperty:$BUILD_TAG '
			}
		}
		stage ("Push on Docker-Hub"){
			steps{
				withCredentials([string(credentialsId: 'docker_hub_id', variable: 'docker_hub_passwd')]) {
    					sh 'sudo docker login -u rahul9664 -p ${docker_hub_passwd}'
					sh 'sudo docker push rahul9664/onlyproperty:$BUILD_TAG'
				}
			}
		}
		stage ("Prod ENV"){
			steps{
				sshagent(credentials:['onlyproperty-login-backend-ssh']) {
			    	 	sh 'ssh -o StrictHostKeyChecking=no rahulkajla2000@34.132.46.200 sudo docker run  -dit  -p  :8080  rahul9664/onlyproperty:$BUILD_TAG'
				}
			}
		}
	}
}

