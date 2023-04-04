const data = [
    {
        field : "What is your first name?",
        placeholder : "Type your answer here....",
        required : true,
        field_name : "first_name",
        type : "text",
        instructions: "",
        autocomplete : "name",
        options : []
    },
    {
        field : "What is your last name?",
        placeholder : "Type your answer here....",
        required : true,
        field_name : "last_name",
        type : "text",
        instructions: "",
        autocomplete : "name",
        options : []
    },
    {
        field : "What industry is your company in?",
        placeholder : "Click the field to get the selected options...",
        required : true,
        field_name : "industry_name",
        type : "select_field",
        instructions: "",
        autocomplete : "",
        options : []
    },
    {
        field : "Your role in your company?",
        placeholder : "Type or select the options below....",
        required : true,
        field_name : "multiple_options_field",
        type : "multiple_option",
        instructions: "We want to understand how you spend your time right now.",
        autocomplete : "",
        options : [
            {
                title : "Get Hired"
            },
            {
                title : "Get Promoted"
            },
            {
                title : "Connect with Like Minded People"
            },
            {
                title : "Structured Approach to growth"
            },
            {
                title : "Build a growth team"
            },
        ]
    },
    {
        field : "What industry is your company in?",
        placeholder : "Type or select the options below....",
        required : true,
        instructions : "Choose Single Options",
        field_name : "single_option_field",
        type : "single_option",
        autocomplete : "",
        options : [
            {
                title : "Founder or CXO"
            },
            {
                title : "Product Team"
            },
            {
                title : "Marketing Team"
            },
            {
                title : "VC"
            },
        ]
    },
    {
        field : "What is your email?",
        placeholder : "Type your answer here....",
        required : true,
        field_name : "email",
        type : "email",
        instructions: "",
        autocomplete : "email",
        options : []
    },
    {
        field : "What is your phone number?",
        placeholder : "Type your answer here....",
        required : true,
        field_name : "phone_number",
        type : "phone_number",
        instructions: "",
        autocomplete : "",
        options : []
    },
]

export default data