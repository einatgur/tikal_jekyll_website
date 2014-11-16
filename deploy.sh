#!/bin/bash

sudo apt-get -y update
sudo apt-get -y install vim curl ruby-rvm
\curl -sSL https://get.rvm.io | bash -s stable --ruby=2.0.0p481
pushd /vagrant
gem install bundler
bundle install
popd
pushd /vagrant
jekyll serve --watch
popd
