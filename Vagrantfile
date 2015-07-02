# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.provider "docker" do |d|
        d.build_dir = "docker/mongo-server/"
        d.has_ssh   = false
        d.ports     = ["27017:27017"]
    end
end