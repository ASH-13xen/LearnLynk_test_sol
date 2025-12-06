# Implementing stripe checkout for application fee

## Setup: 
Let us consider an additional table named payment_req with columns id,stripe_session_id,application_id,status

## Explanation
We have a pay button. Whenever user clicks pay button, frontend sends application_id and its hits our server and server gives a post request 
to stripe with metadata.<br>
Backend asks stripe to generate a checkout session.
Backend saves the record to payment_req with status as pending.<br>
The user is then redirected to stripe checkout page url and
user enters payment details and click pay.
stripe processes the payment and sends post request to api/webhook/stripe endpoint.<br>
Backend server verifies the that if the message is really from stripe and then
server updates status to completed.<br>
server resopnds with status 200 and then the user is redirected to success page.<br>
I have attached a sequence diagram to better understand the flow.<br>

<img width="648" height="438" alt="image" src="https://github.com/user-attachments/assets/233e8f95-8e5f-446a-aa48-1afb1370a663" />

