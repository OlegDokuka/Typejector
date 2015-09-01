# Typejector

[![Join the chat at https://gitter.im/OlegDokuka/Typejector](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OlegDokuka/Typejector?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Standalone, powerful dependency injector for TypeScript and Javascript

Good news, version 0.2 is available now. The main concept of new version of DI is based on powerful Spring DI container with all magic in it. 



##For everyone who read this article and want to help develop this idea and project

I`m open to suggestion and if you want to help me - create new issue, or write on project gitter.

##Requirement
EcmaScript 5 or higer and Typescript 1.5 beta or higer

##How it use?
All you need are several annotation
- @injection - annotation for class that should be imported
- @singletor - work like @injection but add special metadata that mark this class as singleton object
- @interface - work like @injection but add special metadata that mark this class as interface and prevent create instance of this class.
- @inject - annotation for property|method argument|ctor argument in class for which you want to insert the dependency

###Example of code
