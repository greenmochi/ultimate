# Ultimate
This place will provide an overview of the ultimate project. This place should be the center of information for this project,
as well as on how to navigate this project.

# Description
A desktop application filled with much love.

# Motivation
The objective is to create a system where we can essentially write a front-end that can do anything we want: video streaming, 2D/3D graphics,
editing, torrenting, music streaming, manage library of videos, and even more. 

We choose to write the front-end in web technologies [Electron](https://electronjs.org/).

In order to achieve a single application that can essentially do anything, we need a backend that can reciprocate that ideal. A basic example would be an application where the user can download a youtube video or watch a video locally (or stream remotely from a different computer at home).

A rational solution here would be to use [youtube-dl](https://github.com/ytdl-org/youtube-dl) and write the downloading youtube video backend in Python, 
since youtube-dl provides a Python module for everyone to develop their own application with. However, it becomes tempting to finish our example by 
writing the streaming portion in Python as well. Let's assume we don't find a solution in Python that fit our requirements 
(e.g. low memory usage, fast, supports all video format, small binary) to stream our videos. We'd want to use the right tools for the right job. 
In this case, we might consider a C library, [LibVLC](https://wiki.videolan.org/LibVLC/), which is also the core that drives one of the best media application in the world, [VLC Media Player](https://www.videolan.org/vlc/index.html). 

At this point, we have discovered that LibVLC meets the requirements and fortunately provides binding in other languages. Although we see a Python binding
listed, there are disadvantages to using a binding library: is it maintained, is it updated to the latest LibVLC, are the bindings easy to use, are there
special requirements (unusual compilation steps). Is it safe to use? This is the biggest question.

For now, we'll conclude this example by writing the downloading youtube video backend in Python using youtube-dl's Python module. We'll also decide to use
LibVLC and use the library natively by writing our streaming backend in C or C++, and then expose the streaming service through an endpoint such as localhost:8080/stream.

We choose to write the back-end in any language, framework, or library, using [gRPC](https://grpc.io/).

The architecture is actually quite simple because of gRPC. There will be a front-end (even an actual web version could work) that will communicate with a
gateway. The gateway then communicates with the respective gRPC service or REST service. 

```
                                                                       -> gRPC service 0
                                                                       -> REST service 0
front-end -> gateway (converts REST to REST or REST to gRPC protocol)  -> gRPC service 1
                                                                       -> REST service 1
                                                                       -> REST/gRPC service n
```

From afar, there doesn't seem to be anything special right? It's just a front-end talking to many different backend, which is how most websites are built 
these days anyway. But, there are two major points to consider. The first is that all of these services need to be local. Developing a complex backend like this and distributing it to a user is hard. The second point is that we want these services to communicate with each other. Already, inter-process communication is by far one of the messiest things out there to deal with. If REST service 1 wants to talk with REST service 2, then they'd have to talk using REST. 

Example:
```
service1: GET  service2:api/user
service2: POST service1:api/food/add { "name": "apple" }
...
```

Not only is the interface between each API not strict (though we can try to make it strict), in the end we'd need some kind of arbritator. To solve this,
gRPC uses protobufs that not only enforces the API interfaces between each services, but it allows a service to send messages to another service using the
native language of that service with error handling, plug-and-play type of stubs, and other benefits such as HTTP/2.

Unfortunately, gRPC doesn't provide solutions for every language out there such as Rust and Elixir which I'm hugely interested in. Until a better solution comes along, any backend that has no gRPC complement will be served with REST and talk to the gateway using REST.

A more full dataflow of the design look something like the following.
```
                                                      ----> REST service 0
                                                     |
front-end <-> gateway (REST to REST, REST to gRPC) <------> REST service 1
                                                     |
                                                     ------> gRPC service 0 
                                                     |              ^
                                                     |              |
                                                     |              v
                                                     ------> gRPC service 1 
```
Front-end talks with the gateway. The gateway can talk with the front-end. It also converts and forwards the front-end request to the backend services.
REST service can reply to the gateway. However, if it wants to get information on other services, then it will have to talk to the gateway and request it.
gRPC service can reply to the gateway, and it can talk directly with the gRPC service and have benefit of talking with the gateway too.

# Prototype
