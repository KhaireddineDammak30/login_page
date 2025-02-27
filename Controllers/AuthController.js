
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.signupParent = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role: 'medecin' });
    res.status(201).json({ message: 'Parent registered successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.role !== 'medecin') {
      return res.status(401).json({ message: 'Incorrect email address or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect email address or password.' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'secretKey'
    );

    res.json({ token, role: user.role, redirectUrl: '/history' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};


const createAdminUser = async () => {
  try {
 
    const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (existingAdmin) {
      console.log('L\'administrateur existe déjà dans la base de données.');
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin', saltRounds);

    await User.create({
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('L\'administrateur a été ajouté à la base de données.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'administrateur :', error);
  }
};

createAdminUser();



exports.submitReclamation = async (req, res) => {
  const { name, email, message } = req.body;

  try {
   
    const mailOptions = {
      from: `${email}`,
      to: 'kacembrahim499@gmail.com', 
      subject: 'Nouvelle réclamation',
      text: `Nom : ${name}\nE-mail : ${email}\nMessage : ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Réclamation envoyée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de la réclamation.' });
  }
};








