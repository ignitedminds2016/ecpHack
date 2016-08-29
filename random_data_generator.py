from random import randrange
from random import randint
import datetime
import random
import time
import sys

def createJson(name,category):
    paymentType=["Amex","Visa","Discover","Master Card", "Other"]
    txnAmt = randrange(10, 100)
    txnDate=datetime.date(randint(2014,2016), randint(1,12),randint(1,28)).strftime( '%m/%d/%y')
    txnZip=randrange( 85020,85030);
    txnMethod= random.choice(paymentType);
    json='{"merchant_name":'+name+',"category":'+category+',"payment_type":'+txnMethod+',"zipcode":'+str(txnZip)+',"transaction_amount":'+str(txnAmt)+',"date_posted":'+txnDate+'}'
    print json 
    return json

if len(sys.argv) < 4 : exit(" Enter name,category,#entries")
name = sys.argv[1]
category = sys.argv[2]
entries= sys.argv[3]


if ( name is not None and category is not None and range is not None):
  for i in range(1,int(entries)):
      createJson( name,category)


