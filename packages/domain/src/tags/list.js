import Database from '../interfaces/database';

export default () => Database.Models.DocumentTags.Distinct('tag');