from setuptools import setup, find_packages

setup(
    name="yotuube-dl",
    version="0.0.1",
    description="A youtube-dl gRPC service.",
    url="https://github.com/greenmochi/ultimate/services/youtube-dl",
    author="https://github.com/greenmochi",
    author_email="hueyjj@greenmochi.com",
    license="MIT",
    packages=find_packages(exclude=["tests"]),
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3.7",
    ],
    python_requires=">=3.7",
)