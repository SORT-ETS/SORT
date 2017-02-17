.PHONY: doc

deploy: doc
	docker-compose build
	docker-compose up

doc:
	apidoc -c ./doc -i ./server/ -o doc/server/ -e ./venv
	-docker rm -f sort_doc-server
	docker run -d -v ${PWD}/doc/server:/var/www:ro -p 7088:8080 --name sort_doc-server  trinitronx/python-simplehttpserver

