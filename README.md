# Flatiron Phase 4 Project: Tutoring Sign Up Website

## Description

This project is my phase 4 for project for Flatiron software development track bootcamp. I chose this project because it was the last project I was going to do with my highschool computer science class before I decided to leave teaching and pursue a carrer in Software Development. I have also deployed this project on Render [here.](https://knowledgeable-tutoring-platform.onrender.com)
User include admin@fake.com, tutor1@fake.com, tutee1@fake.com with a password of Abc123! for all.

The website is designed for a tutoring service that could be used by schools. There are three user roles (admin, tutors, and tutees) that are used to determine the view of each user's page.

### ADMIN

![Admin dashboard view](/README_IMAGES/admin_dashboard.png)

### Tutor

![Tutor dashboard view](/README_IMAGES/tutor_dashboard.png)

### Tutee

![Tutee dashboard view](/README_IMAGES/tutee_dashboard.png)

This project has 10 active models written using Ruby on Rails. The models include: user, tutoring_time_slot (to set avaible tutoring sessions), school, subjects, buildings, and rooms (to mangange resources), and finally tutor_slot_sign_up, booked_slot, and tutored_subjects to act as join tables to bring it all together. The webiste is desinged to use bcrypt and cookies sessions to authenticate and autherize a user and help them remain logged in even on refresh.

The front end was built with React and React-bootstrap to create unique dashboards for each roll that allows user to signup to work tutoring sessions and get tutoring, as well as leave notes on what to study. The admin dashboards allows for the management of users, school resources, and tutoring with full CRUD operations.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Postgresql
- React-bootstrap for front end css

## Setup

After you clone or fork the repository.

When you're ready to start building your project, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)


If you want some seed data to work with run in a new terminal:
```rails db:seed```

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

I recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Install Postgresql

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

### Getting React-Bootstrap

Navigate to the Client folder in the terminal
'''cd client '''

then install react-bootstrap
'''npm install react-bootstrap bootstrap'''

## Colaboration
I would really like to grow this site as an open source project for schools to use as a tutoring management system. If you would like to contribute please do so, and you can contact me at mr.mcelhinney@gmail.com


## Resources

- [Getting Started with Ruby on Rails on Render](https://render.com/docs/deploy-rails)
- [React-Bootstrap getting started](https://react-bootstrap.github.io/getting-started/introduction)
- [Faker ruby gem](https://github.com/faker-ruby/faker)
- [React Router Dom](https://reactrouter.com/en/main)
