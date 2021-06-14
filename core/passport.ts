import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTstrategy } from 'passport-jwt';

import { IUserModel, UserModel } from '../models';
import { generateMD5 } from '../utils';

passport.use(
  new LocalStrategy(
    async (userName, password, done): Promise<void> => {
      try {
        const user = await UserModel
          .findOne({ $or: [{ email: userName }, { userName }] })
          .exec();

        if (!user) {
          console.log('bad request');
          return done(null, false);
        }

        if (
          user.confirmed
          && user.password === generateMD5(password + process.env.SECRET_KEY)
        ) {
          done(null, user);
        } else {
          done(null, false);
        }

      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY || '123',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: IUserModel }, done): Promise<void> => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) {
          return done(null, user);
        }

        done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user.toJSON());
  });
});

export { passport };