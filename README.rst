ultimate-torrent: a python gRPC torrent and torrent manager service
###################################################################

ultimate-torrent is a gRPC service. It allows a gRPC client to add, create,
and download torrents. ultimate-torrent torrent core uses the python-bindings
for libtorrent.

.. contents::

.. section-numbering::

Building
========

Build for Windows
`````````````````

We recommend you try to build with our instructions first before trying to
build using libtorrent's instructions. This is because we might do a fork one
day, have different configurations, or some build issue that cannot be
addressed immediately.

Build libtorrent (python bindings)
----------------------------------

Visual C++ Build Tools
~~~~~~~~~~~~~~~~~~~~~~

libtorrent says to use Visual C++ 2015 Build Tools, but the latest (2019)
Visual C++ Build Tools seem to work too.

Go to `microsoft downloads page <https://visualstudio.microsoft.com/downloads/>`_
and look for ``Build Tools for Visual Studio 2019``

Add the build tools to your system path. The path looks something like this:

``C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Tools
\MSVC\14.21.27702\bin\Hostx64\x64``

Boost C++ libraries
~~~~~~~~~~~~~~~~~~~

Download Boost 1.70.0 from `Boost main site <https://www.boost.org/users/history/>`_

An example, from the `1.70.0 download list <https://dl.bintray.com/boostorg/release/1.70.0/source/>`_,
download ``boost_1_70_0.7z``.

Extract ``boost_1_70_0.7z`` to ``C:\Libraries``. The resulting path should
look like ``C:\Libraries\boost_1_70_0``.

Create two new environment variable:

``BOOST_ROOT`` with the value ``C:\Libraries\boost_1_70_0``

``BOOST_BUILD_PATH`` with the value ``C:\Libraries\boost_1_70_0\tools\build``

Go into ``C:\Libraries\boost_1_70_0`` and run ``bootstrap.bat``

A bin with tools should have been created at
``C:\Libraries\boost_1_70_0\tools\build\src\engine\bin.ntx86``,
add that path to your system path.

Move ``user-config.jam``
from ``C:\Libraries\boost_1_70_0\tools\build\example\user-config.jam``
to ``C:\Libraries\boost_1_70_0\tools\build\user-config.jam``.

Add the following lines to the user-config.jam
(**note:** use forward slash and replace the python path
and version with yours):

.. code-block:: bash

    using msvc : 14.0 ;
    using python : 3.7 : C:/Users/YOUR_USERNAME/AppData/Local/Programs/Python/Python37-32 : C:/Users/YOUR_USERNAME/AppData/Local/Programs/Python/Python37-32/include : C:/Users/YOUR_USERNAME/AppData/Local/Programs/Python/Python37-32/libs ;

Build libtorrent (python bindings)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clone libtorrent:

.. code-block:: bash

    $ git clone --recurse-submodules https://github.com/arvidn/libtorrent.git

Build libtorrent:

.. code-block:: bash

    $ cd libtorrent/bindings/python
    $ python setup.py build --bjam

Copy the generated ``libtorrent.pyd``
from (libtorrent directory)
``libtorrent/bindings/python/build/lib/libtorrent.pyd``
to (ultimate-torrent directory)
``ultimate-torrent/ultimte-torrent/libtorrent/``.

Build `libtorrent (python bindings) <https://www.libtorrent.org/python_binding.html>`_ for linux
------------------------------------------------------------------------------------------------

Build `libtorrent (python bindings) <https://www.libtorrent.org/python_binding.html>`_ for macOS
------------------------------------------------------------------------------------------------

.. _libtorrent: https://www.libtorrent.org/
.. _libtorrent_python_bindings: https://www.libtorrent.org/python_binding.html
