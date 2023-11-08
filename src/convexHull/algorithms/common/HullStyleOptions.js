function HullStyleOptions (state) {
    const styleOptions = {
        "currHullPoints": { strokeStyle : 'blue',
                            lineWidth : 3
                          },
        "possibleHullPoints": { strokeStyle : 'blue',
                                dotted: true,
                              },
        "compareHullPoints": { strokeStyle : 'yellow',
                               dotted: true,
                             },
        "removedHullPoints": { strokeStyle : 'red',
                               dotted: true,
                             },
    };

    if(state in styleOptions) {
      return styleOptions[state];
    }
    return {};
}

export default HullStyleOptions;