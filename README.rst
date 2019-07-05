ultimate-torrent: a python gRPC torrent and torrent manager service
###################################################################

ultimate-torrent is a gRPC service. It allows a gRPC client to add, create,
and download torrents. ultimate-torrent torrent core uses the python-bindings
for libtorrent.

.. contents::

.. section-numbering::

Requirements
============
* python 3.7+
* pipenv

Building
========

Build for Windows
`````````````````

Our recommendation is to try to build with our instructions first before trying
to build using libtorrent's instructions. This is because we might do a
fork one day, have different configurations, or some build issue that cannot be
addressed immediately.

Build libtorrent (python bindings)
----------------------------------

Visual C++ Build Tools
~~~~~~~~~~~~~~~~~~~~~~

libtorrent says to use Visual C++ 2015 Build Tools, but the latest (2019)
Visual C++ Build Tools seem to work too.

Go to `microsoft downloads page <https://visualstudio.microsoft.com/downloads/>`_
and look for ``Build Tools for Visual Studio 2019``

Add the build tools to our system path. The path looks something like this:

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
add that path to our system path.

Move ``user-config.jam``
from ``C:\Libraries\boost_1_70_0\tools\build\example\user-config.jam``
to ``C:\Libraries\boost_1_70_0\tools\build\user-config.jam``.

Add the following lines to the user-config.jam
(**note:** use forward slash and replace the python path
and version with ours):

.. code-block:: bash

    using msvc : 14.0 ;
    using python : 3.7 : C:/Users/OUR_USERNAME/AppData/Local/Programs/Python/Python37-32 : C:/Users/OUR_USERNAME/AppData/Local/Programs/Python/Python37-32/include : C:/Users/OUR_USERNAME/AppData/Local/Programs/Python/Python37-32/libs ;

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

Setup ultimate-torrent
----------------------
Use pipenv to create a virtual environment to manage our dependencies.

Start pipenv shell:

.. code-block:: bash

    $ pipenv shell

Check to make sure we are using the virtual environment (looks like this):

.. code-block:: bash

    $ pip -V
    pip 19.1.1 from c:\users\OUR_USERNAME\.virtualenvs\ultimate-torrent-p47o5uwh\lib\site-packages\pip (python 3.7)

Install dependencies:

.. code-block:: bash

    $ pipenv install

Generate gRPC stubs:

.. code-block:: bash

    $ make proto

Build for Linux
```````````````

Build for macOS
```````````````

Running
=======

**note:** Always run inside a virtual environment created from pipenv.

Quickstart
`````````````````

.. code-block:: bash

    $ pipenv shell
    $ pipenv install
    $ python setup.py build
    $ python setup.py install
    or
    $ python -m ultimate_torrent

Details
`````````````````

Start virtual environment:

.. code-block:: bash

    $ pipenv shell

Check if we're running in the virtual environment:

.. code-block:: bash

    $ pip -V
    pip 19.1.1 from c:\users\OUR_USERNAME\.virtualenvs\ultimate-torrent-p47o5uwh\lib\site-packages\pip (python 3.7)

Add modules:

.. code-block:: bash

    $ pipenv install module_name

Lock dependencies (**note:** always lock after adding modules
or when the Pipfile changes):

.. code-block:: bash

    $ pipenv lock

Exiting the virtual environment is the same as exiting a shell:

.. code-block:: bash

    $ exit

Check code quality with pylint and autopep8.

.. code-block::

    $ pylint ultimate_torrent

Format the document using autopep8 in vscode.

``shift + alt + f``

or

``ctrl+shift+p format document``

Freezing
========

Use PyInstaller to freeze the application into a runnable executable.

.. code-block::

    $ pyinstaller ultimate_torrent/__main__.py

The build will be in dist/__main__. Probably should rename this later.

VS Code configuration
=====================

If you're using vscode to develop, it is highly recommended to enable the
virtual environment through vscode as well.

``Command palette > Python: Select Interpreter``

Select the virtualenv created for this project.

The integrated terminal will also automatically start the virtualenv in its
shell. As always, check with ``pip -V``.

.. _libtorrent: https://www.libtorrent.org/
.. _libtorrent_python_bindings: https://www.libtorrent.org/python_binding.html