// usersController.js

const User = require('../models/User')

exports.getUserList = async (req, res, next) => {
  try {
    const { name, _sort, _order, _start, _end } = req.query

    let filters = {}
    if (name) {
      filters.name = { $regex: name, $options: 'i' }
    }
    // Sorting
    let sortOptions = {}
    if (_sort && _order) {
      sortOptions[_sort] = _order.toLowerCase() === 'asc' ? 1 : -1
    }

    // Pagination
    const limit = _end
      ? parseInt(_end, 10) - (_start ? parseInt(_start, 10) : 0)
      : undefined
    const skip = _start ? parseInt(_start, 10) : undefined

    const users = await User.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments(filters)
    res.header('X-Total-Count', total)
    res.json(users)
  } catch (error) {
    next(error)
  }
}
