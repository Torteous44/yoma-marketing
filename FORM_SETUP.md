# Form Setup for External Service

Your contact form is set up to work with an external form service. To complete the setup:

## Using Formspree (Recommended)

1. Go to [Formspree](https://formspree.io) and create an account
2. Create a new form
3. Replace `YOUR_FORM_ID` in the contact form with your actual Formspree form ID
4. The form is already configured with the correct action attribute

## Alternative: Using GetForm

1. Go to [GetForm](https://getform.io) and create an account
2. Create a new form
3. Replace the form action with your GetForm endpoint
4. Update the form fields as needed

## Using Netlify Forms (if you deploy to Netlify)

If you choose to deploy to Netlify instead of Cloudflare Pages:
1. Update the form action to `data-netlify="true"`
2. Add a hidden input with name `_subject` for the email subject
3. Netlify Forms will handle the submission automatically

## Form Fields

The form currently has these fields that need to match your external service:
- `name` - User's name
- `email` - User's email address
- `message` - Message content

All fields are marked as required in the form.