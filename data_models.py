""" DUMMY DATA MODELS EXAMPLES """

# USER
user = {
    # swipe
    'id',
    'date',
    'block_users', # array with ids
    'likes', # array with ids
    'matchs', # array with ids
    
    #personal info
    'name',
    'email', # from google auth
    'lastname',
    'age',
    'gender', 
    'photos',
    'description',
    'university',
    
    #configurations
    'show_gender', #mostrar mujeres, hombres, etc
    'distance', # by default 5km around 
    
    # permissions
    'coordinates',
    'notifications',

}

# match

match = {
    'id',
    'date',
    'user 1', # object with the user id and personal info
    'user 2', # object with the user id and personal info
}

# Group swipe
group = {
    "id",
    "date",
    "total_members", # number
    "members", #array with users 
    "share_link", # generate a link to enter to the group
    ""
}

# FIREBASE
# everything on chat system 
# authnetication tokens 


