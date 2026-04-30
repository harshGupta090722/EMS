-->claudinary ,express-upload ,multer

-->Make sure to include type:module

-->correct file name extensions   i.e .js .ts etc


-->🔥 Real backend example
❌ Without Promise.all (slow)
const user = await User.findById(id);
const orders = await Order.find({ userId: id });
const payments = await Payment.find({ userId: id });

👉 Runs one after another (sequential)

✅ With Promise.all (fast)
const [user, orders, payments] = await Promise.all([
    User.findById(id),
    Order.find({ userId: id }),
    Payment.find({ userId: id })
]);

👉 Runs all queries together (parallel)

⚡ Performance gain
Sequential → takes sum of all times
Parallel → takes max of all times


-->process.exit(code);
code = 0 → normal/success exit
code ≠ 0 → error/failure exit


-->