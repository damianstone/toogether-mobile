""" DUMMY DATA MODELS EXAMPLES """

# USER
user = {
    # swipe
    'id',
    'date',
    'block_users',
    'likes', # array with profiles?
    'matchs', # array with profiles?
    
    #personal info
    'name',
    'email',
    'lastname',
    'age',
    'gender',
    'show_swipe',
    'photos',
    'description',
    'university',
    
    # permissions
    'coordinates',
    'notifications',

}

# match

match = {
    'id',
    'date',
    'user 1',
    'user 2',
}

# Group swipe
group = {
    "id",
    "date",
    "total_members",
    "members", #array with users 
    "link",
}

# Group chat
group_chat = {

}
