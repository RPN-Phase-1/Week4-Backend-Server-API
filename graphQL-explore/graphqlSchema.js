const { gql } = require('apollo-server-express')
const UserModel = require('./models/userSchema')
const mongoose = require('mongoose')

const db = "mongodb+srv://punisherhc:Qy5Tq86RPkrBmrHL@cluster0.3jmm1sp.mongodb.net/?retryWrites=true&w=majority"
const connect = async() =>{
    await mongoose.connect(db)
}

exports.typeDefs = gql`
    type User {
        id: ID
        name: String!
        email: String!
        phone: Int!
    }

    type Query{
        getUsersList: [User]
        getUser(id: ID!) : User
    }

    type Mutation {
        createUser(name: String, email: String, phone: Int): User
        updateUser(id: ID!, name: String, email: String, phone: Int) : User
        deleteUser(id: ID!) : Boolean!
    }
`

exports.resolvers = {
    Query:{
        getUsersList: async(parent, args) => {
            await connect()
            const result = UserModel.find()
            return result
        },
        getUser: async(parent,args) => {
            await connect()
            const result = UserModel.findById(args.id)
            return result
        }
    },

    Mutation: {
        createUser : async (parent,args) =>{
            await connect()
            const User = new UserModel({
                name: args.name,
                email: args.email,
                phone: args.phone
            });

            const result = User.save()
            return result
        },
        updateUser: async(parent,args) => {
            await connect()
            const result = UserModel.findByIdAndUpdate(args.id,{
                name: args.name,
                email: args.email,
                phone: args.phone
            })

            return result
        },

        deleteUser: async(parent,args) => {
            try{
                await connect()
                await UserModel.findOneAndDelete({_id: args.id});
                return true
            }catch(error){
                console.log('Error while delete:', error)
                return false
            }
        }
    }
}