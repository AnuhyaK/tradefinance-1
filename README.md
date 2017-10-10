# WORK FLOW:

This Application is related to exchange of products between buyer and seller with an agreement with their respective banks.

Step 1: buyer and seller should have registered with their respective banks.If not register
Step 2: buyer applies for LC for seller bank.
	It performs one action so msgid =1
Step 3: buyer bank has rights to approve or disapprove the LC which has been sent by buyer.
	It performs one action so msgid =2
Step 4: seller will upload the shipping document and seller will send to buyer bank.
	It performs one action so msgid =3
Step 5: buyer bank review shipping documents and approve payment receipt and sends payment confirmation to seller.
	It performs one action so msgid =4
Step 6: seller receives the payment confirmation from seller bank.
Step 7: buyer will collects the products by using shipping documents which has been sent by buyer bank.

# PREREQUISITE SOFTWARES:

1.nodejs
 
The commands for installing nodejs:

command :**$ sudo apt-get update**

command : **$ sudo apt-get install nodejs**

The command for installing nodejs package manager:

command : **$ sudo apt-get install npm**

2.mongodb

Follow this link for installing mongodb:

https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/

3.express

The command for installing express:

command : **$ sudo npm install -g express**

4.body-parser

The command for installing body-parser:

command : **$ sudo npm install body-parser**

5.multer
 
The command for installing multer:

command : **$ sudo npm install --save multer**

6.cookie-parser

The command for installing cookie-parser:

command : **$ sudo npm install cookie-parser**

# ASSIGNING DOMAIN NAME:

Step 1 : Add domain name and ip address in :
 command : **$ sudo gedit /etc/hosts**
 
172.27.80.66    idrbtcps.com

Step 2 : Add the following lines in:

 command : **$ sudo gedit /etc/network/interfaces**

auto enp0f3
iface enp0f3 inet static
address 172.27.80.65    #give your IP Address
netmask 255.255.255.0
gateway 172.27.80.1
dns-nameservers 172.27.80.66 8.8.8.8

Step 3 : Replace ip address with Domain name in client and server interfaces i.e; 172.27.80.66 with idrbtcps.com

# MONGODB DATABASE:

Step 1 : create database named Bank
Step 2 : create collections named 
1.User
2.bank
3.mtt

1.User table: whenever new user registers it automatically updates.
The fields in the User table are :
1.userid
2.userpassword
3.username
4.bankname
5.bankaccno
6.bankifsc

2.bank table: create default bank admin details i.e; it should be done manually by user.
The fields in the bank table are :
1.bankadmin
2.userpassword
3.username
4.bankname
5.bankifsc

3.mtt table: This table holds the complete record of transactions details of buyer and seller.
The fields in the mtt table are:
1.transid: transaction id is given for one complete transaction.
2.msgid: message id will be generated for each action.
3.from: It holds buyer id.
4.to:It holds seller name.
5.buyer: It holds buyer Id. 
6.buyeraccno: It holds account number of buyer.
7.buyerbank:It holds the bank name of buyer.
8.buyerifsc:It holds the ifsc code of the buyer bank.
9.sellername: It holds the seller name.
10.sellerbank: It holds the bank name of seller.
11.selleraccno:It holds account number of seller.
12.sellerifsc:It holds the ifsc code of the seller bank.
13.purchase order:buyer request to buyer bank for applying lc to seller bank.
14.lc:buyer bank has rights for approving or disapproving lc.
15.shipping doc:seller upload shipping documents.
16.paymentreceipt:buyer bank checks payment receipt. 

