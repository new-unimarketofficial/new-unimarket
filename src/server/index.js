// ««««««««« modules »»»»»»»»»
const dotenv = require('dotenv').config();
const {OperationHelper} = require('apac');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const router = require('./routes.js');

const app = express();
const port = process.env.PORT || 3000;

// ----- Parsing -----
app.use(bodyParser.json());
app.use(bodyParser.json({ entended: true }));
app.use(cors());

// ----- Setup routes ------
app.use('/', express.static(path.join(__dirname, '../client/public')));

app.post('/search', (req, res) => {
  const searchQuery = req.body.searchQuery;

  const opHelper = new OperationHelper({
    awsId: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    assocId: process.env.AWS_ASSOCIATE_ID,
  });

  opHelper.execute('ItemSearch', {
    SearchIndex: 'All',
    Keywords: searchQuery,
    ResponseGroup: 'Images, ItemAttributes, Offers, RelatedItems',
    RelationshipType: 'AuthorityTitle',
  }).then((response) => {
      res.json(response.result.ItemSearchResponse.Items);
  }).catch((err) => {
      res.json("Something went wrong! ", err);
  });
});
app.options('*', cors());

// ----- start app -----
app.listen(port, () => {
  console.log(`Unimarket app is listening at port:  ${port}`);
});

module.exports = app;
