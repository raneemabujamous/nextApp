const createUserSchema = {//have body[type,proparites,required] and response => 1)200 2)401
  body: {
    type: "object",
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: { type: "string" },
      phone_number: { type: "string" },
      image: { type: "string" }
    },
    required: ["first_name", "last_name", "email", "phone_number"]
  },
  response: {
    [200]: {
      type: "object",
      properties: {
        User: {
          first_name: { type: "string" },
          last_name: { type: "string" },
          email: { type: "string" },
          phone_number: { type: "string" },
          image: { type: "string" },
          user_id: { type: "number" }


        }
      }
    },
    [401]: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    }
  }
}
const getAllUserScheme = {

  response: {
    [200]: {
      type: "array",
      properites: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        phone_number: { type: "string" },
        image: { type: "string" },
        user_id: { type: "number" },

      }
    },
    [401]: {
      type: "object",
      properties: {
        message: {
          type: "string", nullable: true
        }
      }
    }
  }
}
const getOneUserSchema = {
  querystring: {
    type: "object",
    properties: {
      email: { type: "string" }
    },
    required: ["email"],
  },
  response: {
    [200]: {
      type: "object",
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        phone_number: { type: "string" },
        image: { type: "string" },
        user_id: { type: "number" },
      }
    },
    [401]: {
      type: "object",
      properties: {
        message: {
          type: "string", nullable: true
        }
      }
    }
  }


}
const loginUserSchema = {
  body: {
    type: "object",
    properties: {

      email: { type: "string" },
      password: { type: "string" }
    }, required: ["email", "password"]
  },
  response: {
    [200]: {
      type: "object",
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        phone_number: { type: "string" },
        image: { type: "string" },
        token: { type: "string" },
      }
    },
    [401]: { type: "object", properties: { message: { type: "string" } } },
  }
}
const userUpdSchema = {

  body: {
    type: "object",
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: { type: "string" },
      phone_number: { type: "string" },
      image: { type: "string" }
    },
  },
  response: {
    [200]: {
      type: "object",
      properties: {
        User: {
          first_name: { type: "string" },
          last_name: { type: "string" },
          email: { type: "string" },
          phone_number: { type: "string" },
          image: { type: "string" },
          user_id: { type: "number" }


        }
      }
    },
    [401]: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    }
  }

}
export { userUpdSchema, createUserSchema, getAllUserScheme, getOneUserSchema, loginUserSchema }