import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    if (queryObject['minPrice']  && queryObject['maxPrice'] ) {
      queryObject.price = {
        $gte: queryObject['minPrice'],
        $lte: queryObject['maxPrice'],
      };
    }

    if(queryObject['min_screen_size']  && queryObject['max_screen_size']){
        queryObject.screen_size = {
            $gte: Number(queryObject['min_screen_size']),
            $lte: Number(queryObject['max_screen_size']),
        }
    }
    if(queryObject['max_camera']  && queryObject['min_camera']){
        queryObject.camera = {
            $gte: Number(queryObject['min_camera']),
            $lte: Number(queryObject['max_camera']),
        }
    }

    // TODO relase date

    const excludeFields = ['searchTerm', 'minPrice', 'maxPrice','min_screen_size','max_screen_size','min_camera','max_camera'];
    excludeFields.forEach((el) => delete queryObject[el]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  sort(){
    const sort = (this?.query?.sort as string)?.split(',').join('') || '-createdAt';
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }


}

export default QueryBuilder;
