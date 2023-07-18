import { storeCode } from "../utils/storeCode"

export const createStore = async (req, res) => {
  try {
    const {
      context: {
        models: { Store, User },
      },
      user,
    } = req

    if (user?.role !== 'StoreAdmin') {
      return res
        .status(404)
        .send({ message: `You don't have rights to create store` })
    }

    let { body } = req

    body = {
      ...body,
      storeAdminId: user._id,
      storeCode: await storeCode(),
    }

    const store = await Store.create(body)

    await User.findOneAndUpdate(
      { _id: store.storeAdminId },
      {
        $set: {
          storeId: store._id,
        },
      }
    )

    res.status(200).send({ store })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Error' })
  }
}
