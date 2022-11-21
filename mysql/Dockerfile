FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD rootpass
ENV MYSQL_DATABASE kibitango
ENV MYSQL_USER kibitango
ENV MYSQL_PASSWORD kibitango

COPY ./config/my.conf /etc/mysql/conf.d/my.cnf
COPY ./db.sql /docker-entrypoint-initdb.d

# docker build -t docker-mysql-8-0:1 -f Dockerfile s.
# docker run --name docker-mysql-8-0 -d -v $PWD/db-8-0:/var/lib/mysql -p 13306:3306 docker-mysql-8-0:1
# docker exec -it docker-mysql-8-0 bash