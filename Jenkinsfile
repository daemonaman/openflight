pipeline {
	agent any
	stages {
		stage ("pull code from git repo"){
			steps{
				 git branch: 'main', credentialsId: 'jj', url: 'https://github.com/daemonaman/openflight.git'
			}
		}
		stage ("Build the code"){
			steps{
				sh 'npm install'
			}
		}
        stage('Remove Old Containers and Images') {
            steps {
                script {
                    sh '''
                    sudo docker stop onlyproperty-login-backend || true
                    sudo docker rm onlyproperty-login-backend || true
                    '''
                    sh '''
                    sudo docker rmi daemonaman/onlyproperty-login-backend:latest || true
                    '''
                }
            }
        }

		stage ("Building docker image"){
			steps{
				sh 'sudo docker build -t daemonaman/onlyproperty-login-backend:latest .'
			}
		}
		stage ("Push on Docker-Hub"){
			steps{
				withCredentials([string(credentialsId:  'docker_hub_id1', variable: 'docker_hub_var')]) {
    					sh 'sudo docker login -u daemonaman -p ${docker_hub_var}'
					sh 'sudo docker push daemonaman/onlyproperty-login-backend'
				}
			}
		}
		stage ("Testing the Build"){
			steps{
				sh 'sudo docker run -dit --name onlyproperty-login-backend -p 3000:3000 daemonaman/onlyproperty-login-backend:latest'
			}
		}
	}
}
