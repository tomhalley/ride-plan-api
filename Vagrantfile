# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.110.50"
  config.vm.provision :shell, path: ".vagrant/scripts/main.sh"
end
