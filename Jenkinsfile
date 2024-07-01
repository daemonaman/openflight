
pipeline {
	agent any
	stages {
		stage ("pull code from git repo"){
			steps{
				git branch: 'main', url: 'https://github.com/Rahuljat17/onlyproperty-login-backend.git'
			}
		}
		stage ("Build the code"){
			steps{
				sh 'npm install'
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
		stage ("Testing the Build"){
			steps{
				sh 'sudo docker run -dit --name testing$BUILD_TAG -p 8090:8080 rahul9664/onlyproperty:$BUILD_TAG'
			}
		}
	}
}
