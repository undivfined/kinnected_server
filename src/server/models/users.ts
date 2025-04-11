import { CreateUserDto } from "../../dto/CreateUserDto"


export function fetchUsers() 
{
    return {
            user1: "User 1",
            user2: "User 2",
    }
    
}

export function createUser(body: CreateUserDto) {
    return body
    
}