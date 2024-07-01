pipeline{
	agent any

	environment{
	     BITBUCKET_CREDENTIALS = credentials('new')
	     REPO_URL = 'https://rahulkajla2000@bitbucket.org/simanchalalearning/onlyproperty-login-backend.git'
	     }

	stages{
		stage('Checkout'){
			steps{
				script{
					checkout([$class: 'GitSCM',
						  branches: [[name: '*/main']],
						  userRemoteConfigs: [[url: "${env.REPO_URL}", credentialsID: "${env.BITBUCKET_CREDENTIALS}"]]
					])
				}
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
				sshagent(credentials:['node-1']) {
			    	 	sh 'ssh -o StrictHostKeyChecking=no ubuntu@34.72.81.81 sudo docker run  -dit  -p  :8080  rahul9664/java-app:$BUILD_TAG'
				}
			}
		}
	}
}

