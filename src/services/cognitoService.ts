import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';

// Cognito Pool Configuration
const poolData = {
    UserPoolId: 'us-east-1_KXSzOXs3J',
    ClientId: 'cs80h5sinbg1920k4vftmimsc',  
};

const userPool = new CognitoUserPool(poolData);

// Sign-up Function
export const signUp = (name: string, email: string, password: string, role?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const attributeList: CognitoUserAttribute[] = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
            new CognitoUserAttribute({ Name: 'custom:role', Value: role || '' }),
            new CognitoUserAttribute({ Name: 'name', Value: name }),
            new CognitoUserAttribute({ Name: 'given_name', Value: 'test' }),
            new CognitoUserAttribute({ Name: 'family_name', Value: 'test' }),
        ];

        userPool.signUp(email, password, attributeList, [], (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                console.log('User signed up successfully:', result?.user.getUsername());
                window.location.href = `/email-confirmation?email=${email}`;
                resolve();
            }
        });
    });
};

// Sign-in Function
export const signIn = (email: string, password: string): Promise<{ session: CognitoUserSession; userData: any }> => {
    const authDetails = new AuthenticationDetails({ 
        Username: email, 
        Password: password,
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: async (session: CognitoUserSession) => {
                try {
                    const userData = await getUserData(user);
                    console.log("user data", userData["custom:role"]);
                    localStorage.setItem("role", userData["custom:role"]);
                    
                    if (userData["custom:role"] === "founder") {
                        window.location.href = '/founder-details';
                    } else if (userData["custom:role"] === "investor") {
                        window.location.href = '/investor-details';
                    }
                    resolve({ session, userData });
                } catch (error) {
                    reject(error);
                }
            },
            onFailure: (err: any) => reject(err),
        });
    });
};

// Function to get user data
const getUserData = (user: CognitoUser): Promise<any> => {
    return new Promise((resolve, reject) => {
        user.getUserAttributes((err: any, attributes: any) => {
            if (err) {
                reject(err);
            } else {
                const userData: Record<string, string> = {};
                attributes?.forEach((attribute:any) => {
                    userData[attribute.getName()] = attribute.getValue();
                });
                resolve(userData);
            }
        });
    });
};

// Confirm Sign-up Function
export const confirmSignUp = (email: string, code: string): Promise<any> => {
    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                console.log('Email confirmed successfully:', result);
                resolve(result);
            }
        });
    });
};
