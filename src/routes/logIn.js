









router.post('/login', (req, res, next) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    User.findOne({ email })
        .then(user => {


            if (!user) {
                errors.email = 'User not found'

                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                        if (!user.isVerified) return res.status(401).send({  msg: 'Your account has not been verified.' });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
           
        });
});
